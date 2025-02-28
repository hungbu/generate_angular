import { Injectable, WritableSignal, signal } from '@angular/core';

export class ToastData {
  type: 'empty' | 'info' | 'error' | 'warning' | 'success';
  message: string;

  constructor(
    type: 'info' | 'error' | 'warning' | 'empty' | 'success',
    message: string
  ) {
    this.type = type;
    this.message = message;
  }

  get isEmpty(): boolean {
    return this.type === 'empty';
  }

  get isWarning(): boolean {
    return this.type === 'warning';
  }

  get isInfo(): boolean {
    return this.type === 'info';
  }

  get isError(): boolean {
    return this.type === 'error';
  }

  get isSuccess(): boolean {
    return this.type === 'success';
  }

  get isNotEmpty(): boolean {
    return !this.isEmpty;
  }
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toastInfo: WritableSignal<ToastData> = signal(new ToastData('empty', ''));

  constructor() {}

  setToastInfo(data: ToastData): void {
    this.toastInfo.set(data);
  }

  get getToastInfo() {
    return this.toastInfo();
  }
}
