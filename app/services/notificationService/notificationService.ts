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

  /**
   * Send success notification
   * @param notification Notification
   */
  success(notification: INotification): void {
    Vue.notify({
      ...notification,
      group: 'all',
      type: 'success',
      duration: this._notificationDuration,
    })
  }

  /**
   * Send error notification
   * @param notification Notification
   */
  error(notification: INotification): void {
    Vue.notify({
      ...notification,
      group: 'all',
      type: 'error',
      duration: this._notificationDuration,
    })
  }

  /**
   * Send alert notification
   * @param notification Notification
   */
  alert(notification: INotification): void {
    Vue.notify({
      ...notification,
      group: 'all',
      type: 'alert',
      duration: this._notificationDuration,
    })
  }

  /**
   * Send info notification
   * @param notification Notification
   */
  info(notification: INotification): void {
    Vue.notify({
      ...notification,
      group: 'all',
      type: 'info',
      duration: this._notificationDuration,
    })
  }

  /**
   * Send standard success notification
   * @param notification Notification
   */
  defaultSuccess(): void {
    Vue.notify({
      group: 'all',
      type: 'success',
      title: this._defaultSuccessMessage.title,
      text: this._defaultSuccessMessage.text,
      duration: this._notificationDuration,
    })
  }

  /**
   * Send standard error notification
   * @param notification Notification
   */
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
