import type { Meta, StoryObj } from '@storybook/react';

import { FullScreenPlan } from './Plan';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/Plan',
  component: FullScreenPlan,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof FullScreenPlan>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Plan1: Story = {
  args: {
    plan: JSON.stringify({
      version: { minorNumber: 20, producer: 'validator-test' },
      extensionUris: [
        {
          extensionUriAnchor: 1,
          uri: 'https://github.com/substrait-io/substrait/blob/main/extensions/functions_set.yaml',
        },
        {
          extensionUriAnchor: 2,
          uri: 'https://github.com/substrait-io/substrait/blob/main/extensions/functions_comparison.yaml',
        },
        {
          extensionUriAnchor: 3,
          uri: 'https://github.com/substrait-io/substrait/blob/main/extensions/functions_arithmetic_decimal.yaml',
        },
      ],
      extensions: [
        {
          extensionFunction: {
            extensionUriReference: 1,
            functionAnchor: 1,
            name: 'index_in',
          },
        },
        {
          extensionFunction: {
            extensionUriReference: 2,
            functionAnchor: 2,
            name: 'is_null',
          },
        },
        {
          extensionFunction: {
            extensionUriReference: 2,
            functionAnchor: 3,
            name: 'equal',
          },
        },
        {
          extensionFunction: {
            extensionUriReference: 3,
            functionAnchor: 4,
            name: 'sum',
          },
        },
        {
          extensionFunction: {
            extensionUriReference: 3,
            functionAnchor: 5,
            name: 'multiply',
          },
        },
      ],
      relations: [
        {
          root: {
            names: ['product_name', 'product_id', 'sales'],
            input: {
              aggregate: {
                input: {
                  join: {
                    left: {
                      read: {
                        namedTable: {
                          names: ['orders'],
                        },
                        baseSchema: {
                          names: [
                            'product_id',
                            'quantity',
                            'order_date',
                            'price',
                          ],
                          struct: {
                            types: [
                              {
                                i64: {
                                  nullability: 'NULLABILITY_REQUIRED',
                                },
                              },
                              {
                                i32: {
                                  nullability: 'NULLABILITY_REQUIRED',
                                },
                              },
                              {
                                date: {
                                  nullability: 'NULLABILITY_REQUIRED',
                                },
                              },
                              {
                                decimal: {
                                  scale: 2,
                                  precision: 10,
                                  nullability: 'NULLABILITY_NULLABLE',
                                },
                              },
                            ],
                            nullability: 'NULLABILITY_REQUIRED',
                          },
                        },
                      },
                    },
                    right: {
                      filter: {
                        input: {
                          read: {
                            namedTable: {
                              names: ['products'],
                            },
                            baseSchema: {
                              names: [
                                'product_id',
                                'categories',
                                'details',
                                'manufacturer',
                                'year_created',
                                'product_name',
                              ],
                              struct: {
                                types: [
                                  {
                                    i64: {
                                      nullability: 'NULLABILITY_REQUIRED',
                                    },
                                  },
                                  {
                                    list: {
                                      type: {
                                        string: {
                                          nullability: 'NULLABILITY_REQUIRED',
                                        },
                                      },
                                      nullability: 'NULLABILITY_REQUIRED',
                                    },
                                  },
                                  {
                                    struct: {
                                      types: [
                                        {
                                          string: {
                                            nullability: 'NULLABILITY_NULLABLE',
                                          },
                                        },
                                        {
                                          i32: {
                                            nullability: 'NULLABILITY_NULLABLE',
                                          },
                                        },
                                      ],
                                      nullability: 'NULLABILITY_NULLABLE',
                                    },
                                  },
                                  {
                                    string: {
                                      nullability: 'NULLABILITY_NULLABLE',
                                    },
                                  },
                                ],
                                nullability: 'NULLABILITY_REQUIRED',
                              },
                            },
                          },
                        },
                        condition: {
                          scalarFunction: {
                            functionReference: 2,
                            outputType: {
                              bool: {
                                nullability: 'NULLABILITY_REQUIRED',
                              },
                            },
                            arguments: [
                              {
                                value: {
                                  scalarFunction: {
                                    functionReference: 1,
                                    outputType: {
                                      i64: {
                                        nullability: 'NULLABILITY_NULLABLE',
                                      },
                                    },
                                    arguments: [
                                      {
                                        value: {
                                          literal: {
                                            string: 'Computers',
                                          },
                                        },
                                      },
                                      {
                                        value: {
                                          selection: {
                                            directReference: {
                                              structField: {
                                                field: 1,
                                              },
                                            },
                                            rootReference: {},
                                          },
                                        },
                                      },
                                    ],
                                  },
                                },
                              },
                            ],
                          },
                        },
                      },
                    },
                    type: 'JOIN_TYPE_INNER',
                    expression: {
                      scalarFunction: {
                        functionReference: 3,
                        outputType: {
                          bool: {
                            nullability: 'NULLABILITY_NULLABLE',
                          },
                        },
                        arguments: [
                          {
                            value: {
                              selection: {
                                directReference: {
                                  structField: {
                                    field: 0,
                                  },
                                },
                                rootReference: {},
                              },
                            },
                          },
                          {
                            value: {
                              selection: {
                                directReference: {
                                  structField: {
                                    field: 4,
                                  },
                                },
                                rootReference: {},
                              },
                            },
                          },
                        ],
                      },
                    },
                  },
                },
                groupings: [
                  {
                    groupingExpressions: [
                      {
                        selection: {
                          directReference: {
                            structField: {
                              field: 0,
                            },
                          },
                          rootReference: {},
                        },
                      },
                      {
                        selection: {
                          directReference: {
                            structField: {
                              field: 7,
                            },
                          },
                          rootReference: {},
                        },
                      },
                    ],
                  },
                ],
                measures: [
                  {
                    measure: {
                      functionReference: 4,
                      outputType: {
                        decimal: {
                          scale: 2,
                          precision: 38,
                          nullability: 'NULLABILITY_NULLABLE',
                        },
                      },
                      arguments: [
                        {
                          value: {
                            scalarFunction: {
                              functionReference: 5,
                              outputType: {
                                decimal: {
                                  scale: 2,
                                  precision: 38,
                                  nullability: 'NULLABILITY_NULLABLE',
                                },
                              },
                              arguments: [
                                {
                                  value: {
                                    cast: {
                                      type: {
                                        decimal: {
                                          scale: 2,
                                          precision: 10,
                                          nullability: 'NULLABILITY_REQUIRED',
                                        },
                                      },
                                      input: {
                                        selection: {
                                          directReference: {
                                            structField: {
                                              field: 1,
                                            },
                                          },
                                          rootReference: {},
                                        },
                                      },
                                    },
                                  },
                                },
                                {
                                  value: {
                                    selection: {
                                      directReference: {
                                        structField: {
                                          field: 3,
                                        },
                                      },
                                      rootReference: {},
                                    },
                                  },
                                },
                              ],
                            },
                          },
                        },
                      ],
                    },
                  },
                ],
                common: {
                  emit: {
                    outputMapping: [1, 0, 2],
                  },
                },
              },
            },
          },
        },
      ],
    }),
  },
};

export const Plan2: Story = {
  args: {
    plan: JSON.stringify({
      relations: [
        {
          root: {
            input: {
              project: {
                input: {
                  read: {
                    baseSchema: {
                      names: [
                        'l_orderkey',
                        'l_partkey',
                        'l_suppkey',
                        'l_linenumber',
                        'l_quantity',
                        'l_extendedprice',
                        'l_discount',
                        'l_tax',
                        'l_returnflag',
                        'l_linestatus',
                        'l_shipdate',
                        'l_commitdate',
                        'l_receiptdate',
                        'l_shipinstruct',
                        'l_shipmode',
                        'l_comment',
                      ],
                      struct: {
                        types: [
                          {
                            i32: {
                              nullability: 'NULLABILITY_REQUIRED',
                            },
                          },
                          {
                            i32: {
                              nullability: 'NULLABILITY_REQUIRED',
                            },
                          },
                          {
                            i32: {
                              nullability: 'NULLABILITY_REQUIRED',
                            },
                          },
                          {
                            i32: {
                              nullability: 'NULLABILITY_REQUIRED',
                            },
                          },
                          {
                            i32: {
                              nullability: 'NULLABILITY_REQUIRED',
                            },
                          },
                          {
                            decimal: {
                              scale: 2,
                              precision: 15,
                              nullability: 'NULLABILITY_REQUIRED',
                            },
                          },
                          {
                            decimal: {
                              scale: 2,
                              precision: 15,
                              nullability: 'NULLABILITY_REQUIRED',
                            },
                          },
                          {
                            decimal: {
                              scale: 2,
                              precision: 15,
                              nullability: 'NULLABILITY_REQUIRED',
                            },
                          },
                          {
                            varchar: {
                              nullability: 'NULLABILITY_REQUIRED',
                            },
                          },
                          {
                            varchar: {
                              nullability: 'NULLABILITY_REQUIRED',
                            },
                          },
                          {
                            date: {
                              nullability: 'NULLABILITY_REQUIRED',
                            },
                          },
                          {
                            date: {
                              nullability: 'NULLABILITY_REQUIRED',
                            },
                          },
                          {
                            date: {
                              nullability: 'NULLABILITY_REQUIRED',
                            },
                          },
                          {
                            varchar: {
                              nullability: 'NULLABILITY_REQUIRED',
                            },
                          },
                          {
                            varchar: {
                              nullability: 'NULLABILITY_REQUIRED',
                            },
                          },
                          {
                            varchar: {
                              nullability: 'NULLABILITY_REQUIRED',
                            },
                          },
                        ],
                        nullability: 'NULLABILITY_REQUIRED',
                      },
                    },
                    projection: {
                      select: {
                        structItems: [
                          {},
                          {
                            field: 1,
                          },
                          {
                            field: 2,
                          },
                          {
                            field: 3,
                          },
                          {
                            field: 4,
                          },
                          {
                            field: 5,
                          },
                          {
                            field: 6,
                          },
                          {
                            field: 7,
                          },
                          {
                            field: 8,
                          },
                          {
                            field: 9,
                          },
                          {
                            field: 10,
                          },
                          {
                            field: 11,
                          },
                          {
                            field: 12,
                          },
                          {
                            field: 13,
                          },
                          {
                            field: 14,
                          },
                          {
                            field: 15,
                          },
                        ],
                      },
                      maintainSingularStruct: true,
                    },
                    namedTable: {
                      names: ['lineitem'],
                    },
                  },
                },
                expressions: [
                  {
                    selection: {
                      directReference: {
                        structField: {},
                      },
                      rootReference: {},
                    },
                  },
                  {
                    selection: {
                      directReference: {
                        structField: {
                          field: 1,
                        },
                      },
                      rootReference: {},
                    },
                  },
                  {
                    selection: {
                      directReference: {
                        structField: {
                          field: 2,
                        },
                      },
                      rootReference: {},
                    },
                  },
                  {
                    selection: {
                      directReference: {
                        structField: {
                          field: 3,
                        },
                      },
                      rootReference: {},
                    },
                  },
                  {
                    selection: {
                      directReference: {
                        structField: {
                          field: 4,
                        },
                      },
                      rootReference: {},
                    },
                  },
                  {
                    selection: {
                      directReference: {
                        structField: {
                          field: 5,
                        },
                      },
                      rootReference: {},
                    },
                  },
                  {
                    selection: {
                      directReference: {
                        structField: {
                          field: 6,
                        },
                      },
                      rootReference: {},
                    },
                  },
                  {
                    selection: {
                      directReference: {
                        structField: {
                          field: 7,
                        },
                      },
                      rootReference: {},
                    },
                  },
                  {
                    selection: {
                      directReference: {
                        structField: {
                          field: 8,
                        },
                      },
                      rootReference: {},
                    },
                  },
                  {
                    selection: {
                      directReference: {
                        structField: {
                          field: 9,
                        },
                      },
                      rootReference: {},
                    },
                  },
                  {
                    selection: {
                      directReference: {
                        structField: {
                          field: 10,
                        },
                      },
                      rootReference: {},
                    },
                  },
                  {
                    selection: {
                      directReference: {
                        structField: {
                          field: 11,
                        },
                      },
                      rootReference: {},
                    },
                  },
                  {
                    selection: {
                      directReference: {
                        structField: {
                          field: 12,
                        },
                      },
                      rootReference: {},
                    },
                  },
                  {
                    selection: {
                      directReference: {
                        structField: {
                          field: 13,
                        },
                      },
                      rootReference: {},
                    },
                  },
                  {
                    selection: {
                      directReference: {
                        structField: {
                          field: 14,
                        },
                      },
                      rootReference: {},
                    },
                  },
                  {
                    selection: {
                      directReference: {
                        structField: {
                          field: 15,
                        },
                      },
                      rootReference: {},
                    },
                  },
                ],
              },
            },
            names: [
              'l_orderkey',
              'l_partkey',
              'l_suppkey',
              'l_linenumber',
              'l_quantity',
              'l_extendedprice',
              'l_discount',
              'l_tax',
              'l_returnflag',
              'l_linestatus',
              'l_shipdate',
              'l_commitdate',
              'l_receiptdate',
              'l_shipinstruct',
              'l_shipmode',
              'l_comment',
            ],
          },
        },
      ],
    }),
  },
};
