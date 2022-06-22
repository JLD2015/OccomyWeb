export {};

declare global {
  interface Window {
    MSStream: string;
    opera: any;
    grecaptcha: any;
  }
}
