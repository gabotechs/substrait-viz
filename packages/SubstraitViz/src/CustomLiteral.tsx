import { CustomRenderProps } from '@protobuf-viz/react';
import { Expression_Literal } from './gen/substrait/algebra_pb.ts';

export function CustomLiteral({ msg }: CustomRenderProps<Expression_Literal>) {
  const n = msg.literalType;
  const wrap = (s: string) => (
    <div className={'text-nowrap'}>
      {s} ({n.case})
    </div>
  );
  switch (n.case) {
    case 'decimal': {
      const { value, scale, precision } = n.value;
      return wrap(convertDecimal(value, scale, precision));
    }
    case 'intervalYearToMonth':
      return wrap(`${n.value.years} years ${n.value.months} months`);
    case 'intervalDayToSecond': {
      const { days, seconds } = n.value;
      return wrap(`${days} days ${seconds} s`);
    }
    default:
      return wrap(stringify(msg.literalType.value));
  }
}

function stringify(v: unknown): string {
  return JSON.stringify(v, (_, value) =>
    typeof value === 'bigint' ? value.toString() : value,
  );
}

// Function generated by gpt-o3-mini. I do not trust it, but I don't have
// time to build one myself.
/**
 * Converts a decimal value stored in a binary buffer (big-endian, two's complement)
 * to its string representation with a given scale and precision.
 *
 * @param buffer - The Uint8Array containing the binary representation.
 * @param scale - The number of digits after the decimal point.
 * @param precision - The maximum total number of digits allowed (excluding sign and decimal point).
 * @returns The formatted decimal string.
 *
 * @throws Error if the total digits exceed the allowed precision.
 */
function convertDecimal(
  buffer: Uint8Array,
  scale: number,
  precision: number,
): string {
  // Determine if the number is negative.
  const isNegative = (buffer[0] & 0x80) !== 0;

  // Convert the buffer into a BigInt assuming a big-endian representation.
  let bigValue = BigInt(0);
  for (let i = 0; i < buffer.length; i++) {
    bigValue = (bigValue << 8n) + BigInt(buffer[i]);
  }

  // Adjust for two's complement if the number is negative.
  if (isNegative) {
    bigValue -= 1n << BigInt(buffer.length * 8);
  }

  // Get the absolute value as a string.
  let digits = bigValue < 0 ? (-bigValue).toString() : bigValue.toString();

  // Pad with zeros if necessary so that there's at least (scale + 1) digits.
  if (digits.length <= scale) {
    digits = digits.padStart(scale + 1, '0');
  }

  // Split into integer and fractional parts.
  let intPart = digits.slice(0, digits.length - scale);
  let fracPart = scale > 0 ? digits.slice(digits.length - scale) : '';

  // If rounding is enabled and the total digits exceed precision, apply rounding.
  if (intPart.length + fracPart.length > precision) {
    // Convert to a number using BigInt and then to a fixed precision string.
    // Calculate factor for rounding (10^(total extra digits))
    const totalDigits = intPart.length + fracPart.length;
    const extraDigits = totalDigits - precision;
    const factor = BigInt(10) ** BigInt(extraDigits);

    // Round the value
    let roundedValue = bigValue / factor;
    // Check if we need to round up (simple round half-up)
    const remainder = bigValue % factor;
    if (remainder * 2n >= factor) {
      roundedValue += 1n;
    }

    // Recreate digits after rounding
    digits =
      roundedValue < 0n ? (-roundedValue).toString() : roundedValue.toString();
    if (digits.length <= scale) {
      digits = digits.padStart(scale + 1, '0');
    }
    intPart = digits.slice(0, digits.length - scale);
    fracPart = scale > 0 ? digits.slice(digits.length - scale) : '';
  }

  // Build the final string.
  let result = scale > 0 ? `${intPart}.${fracPart}` : intPart;
  if (isNegative) {
    result = '-' + result;
  }
  return result;
}
