import { t } from '../i18n';
import { Component, type ReactNode } from 'react';
import { Modal } from './Modal';

interface Props { children: ReactNode; label: string; onDismiss?: () => void }
export class FeatureBoundary extends Component<Props, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    if (!this.state.failed) return this.props.children;
    const message = <div role="alert" className="max-w-lg rounded-xl border border-neutral-300 bg-white p-4 text-xs shadow-lg">
      {t('{label} could not be loaded. Reload the page to retry.', { label: this.props.label })}<button className="ml-3 underline" onClick={() => window.location.reload()}>{t("Reload page")}</button>
      {this.props.onDismiss && <button className="ml-3 underline" onClick={this.props.onDismiss}>{t("Dismiss")}</button>}
    </div>;
    return this.props.onDismiss ? <Modal isOpen onClose={this.props.onDismiss} label={t('{label} unavailable', { label: this.props.label })}>
      <div className="fixed inset-0 flex items-center justify-center bg-black/60 p-4">{message}</div>
    </Modal> : <div className="fixed bottom-4 left-4 right-4 z-[80]">{message}</div>;
  }
}
