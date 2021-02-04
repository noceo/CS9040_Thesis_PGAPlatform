import { injectable } from 'inversify'
import Vue from 'vue'
import {
  INotificationService,
  INotification,
} from './notificationService.types'

@injectable()
export class NotificationService implements INotificationService {
  private _defaultSuccessMessage: INotification
  private _defaultErrorMessage: INotification
  private _notificationDuration: number

  constructor(
    defaultSuccessMessage: INotification,
    defaultErrorMessage: INotification,
    notificationDuration: number
  ) {
    this._defaultSuccessMessage = defaultSuccessMessage
    this._defaultErrorMessage = defaultErrorMessage
    this._notificationDuration = notificationDuration
  }

  success(notification: INotification): void {
    Vue.notify({
      ...notification,
      group: 'all',
      type: 'success',
      duration: this._notificationDuration,
    })
  }

  error(notification: INotification): void {
    Vue.notify({
      ...notification,
      group: 'all',
      type: 'error',
      duration: this._notificationDuration,
    })
  }

  alert(notification: INotification): void {
    Vue.notify({
      ...notification,
      group: 'all',
      type: 'alert',
      duration: this._notificationDuration,
    })
  }

  info(notification: INotification): void {
    Vue.notify({
      ...notification,
      group: 'all',
      type: 'info',
      duration: this._notificationDuration,
    })
  }

  defaultSuccess(): void {
    Vue.notify({
      group: 'all',
      type: 'success',
      title: this._defaultSuccessMessage.title,
      text: this._defaultSuccessMessage.text,
      duration: this._notificationDuration,
    })
  }

  defaultError(): void {
    Vue.notify({
      group: 'all',
      type: 'error',
      title: this._defaultErrorMessage.title,
      text: this._defaultErrorMessage.text,
      duration: this._notificationDuration,
    })
  }
}
