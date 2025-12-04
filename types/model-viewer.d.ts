import '@google/model-viewer';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          'ios-src'?: string;
          poster?: string;
          'shadow-intensity'?: string;
          'camera-controls'?: boolean;
          'auto-rotate'?: boolean;
          ar?: boolean;
          'ar-modes'?: string;
          slot?: string;
        },
        HTMLElement
      >;
    }
  }
}

export {};
