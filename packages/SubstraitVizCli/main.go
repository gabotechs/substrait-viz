package main

import (
	_ "embed"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"os"
	"os/exec"
	"runtime"

	"github.com/spf13/cobra"
)

//go:embed dist/index.html
var indexHtml []byte

//go:embed dist/index.js
var indexJs []byte

//go:embed dist/index.css
var indexCss []byte

//go:embed public/logo.svg
var logo []byte

var descriptors []string

var root = &cobra.Command{
	Use:     "substrait-viz",
	Version: mustParsePackageJson().Version,
	Short:   "Visualize Substrait plans using a flow diagram",
	Args:    cobra.MaximumNArgs(1),
	Example: `$ substrait-viz substrait-file.json
$ cat substrait-file.json | substrait-viz
`,
	Long: `           _         _             _ _           _     
 ___ _   _| |__  ___| |_ _ __ __ _(_) |_  __   _(_)____
/ __| | | | '_ \/ __| __| '__/ _  | | __| \ \ / / |_  /
\__ \ |_| | |_) \__ \ |_| | | (_| | | |_   \ V /| |/ /
|___/\__,_|_.__/|___/\__|_|  \__,_|_|\__|   \_/ |_/___|

Visualize Substrait plans using a flow diagram
`,
	RunE: func(cmd *cobra.Command, args []string) error {
		var plan []byte
		var err error
		if len(args) > 0 {
			plan, err = os.ReadFile(args[0])
		} else {
			plan, err = io.ReadAll(os.Stdin)
		}
		if err != nil {
			return err
		}
		if len(plan) == 0 {
			return errors.New("The plan is empty")
		}

		descriptorMap := make(map[string][]byte)
		for _, desc := range descriptors {
			plan, err = os.ReadFile(desc)
			if err != nil {
				return err
			}
		}

		http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Content-Type", "text/html")
			_, _ = w.Write(indexHtml)
		})
		http.HandleFunc("/plan", func(w http.ResponseWriter, r *http.Request) {
			var jsonObject map[string]interface{}
			if json.Unmarshal(plan, &jsonObject) == nil {
				w.Header().Set("Content-Type", "application/json")
			}
			_, _ = w.Write(plan)
		})
		http.HandleFunc("/descriptors", func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Content-Type", "application/json")
			res, _ := json.Marshal(descriptors)
			_, _ = w.Write(res)
		})
		http.HandleFunc("/descriptor/", func(w http.ResponseWriter, r *http.Request) {
			desc := r.URL.Path[len("/descriptor/"):]
			if descriptor, ok := descriptorMap[desc]; ok {
				_, _ = w.Write(descriptor)
			} else {
				http.NotFound(w, r)
			}
		})
		http.HandleFunc("/index.js", func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Content-Type", "application/javascript")
			_, _ = w.Write(indexJs)
		})
		http.HandleFunc("/index.css", func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Content-Type", "text/css")
			_, _ = w.Write(indexCss)
		})
		http.HandleFunc("/logo.svg", func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Content-Type", "image/svg+xml")
			_, _ = w.Write(logo)
		})

		port := 8080
		go func() {
			url := fmt.Sprintf("http://localhost:%d/", port)
			_, _ = fmt.Fprintln(os.Stderr, "Serving on", url+"...")
			_ = openInBrowser(url)
		}()
		return http.ListenAndServe(fmt.Sprintf(":%d", port), nil)
	},
}

type PackageJson struct {
	Version string `json:"version"`
}

//go:embed package.json
var packageJson []byte

func mustParsePackageJson() PackageJson {
	var result PackageJson
	err := json.Unmarshal(packageJson, &result)
	if err != nil {
		panic(err)
	}
	return result
}

func openInBrowser(url string) error {
	switch runtime.GOOS {
	case "linux":
		return exec.Command("xdg-open", url).Start()
	case "windows":
		return exec.Command("rundll32", "url.dll,FileProtocolHandler", url).Start()
	case "darwin":
		return exec.Command("open", url).Start()
	default:
		return fmt.Errorf("unsupported platform '%s'", runtime.GOOS)
	}
}

func main() {
	descriptors = *root.PersistentFlags().StringArrayP("descriptor", "d", nil, "list of protobuf descriptor sets that contain extra message definitions.")
	err := root.Execute()
	if err != nil {
		_, _ = fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
}
