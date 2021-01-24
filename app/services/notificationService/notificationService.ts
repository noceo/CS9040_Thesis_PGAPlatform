import { injectable } from 'inversify'
import Vue from 'vue'
import {
  INotificationService,
  INotification,
} from './notificationService.types'

@injectable()
export class NotificationService implements INotificationService {
  readonly defaultSuccessMessage: INotification
  readonly defaultErrorMessage: INotification

  constructor(
    defaultSuccessMessage: INotification,
    defaultErrorMessage: INotification
  ) {
    this.defaultSuccessMessage = defaultSuccessMessage
    this.defaultErrorMessage = defaultErrorMessage
  }

  success(notification: INotification): void {
    Vue.notify({
      ...notification,
      group: 'all',
      type: 'success',
      duration: 100000,
    })
  }

  error(notification: INotification): void {
    Vue.notify({ ...notification, group: 'all', type: 'error' })
  }

  alert(notification: INotification): void {
    Vue.notify({ ...notification, group: 'all', type: 'alert' })
  }

  info(notification: INotification): void {
    Vue.notify({ ...notification, group: 'all', type: 'info' })
  }

  defaultSuccess(): void {
    Vue.notify({
      group: 'all',
      type: 'success',
      title: this.defaultSuccessMessage.title,
      text: this.defaultSuccessMessage.text,
    })
  }

  defaultError(): void {
    Vue.notify({
      group: 'all',
      type: 'error',
      title: this.defaultErrorMessage.title,
      text: this.defaultErrorMessage.text,
    })
  }
}
