export interface INotification {
  title: string
  text: string
}

export interface INotificationService {
  defaultSuccess(): void
  defaultError(): void

  success(notification: INotification): void
  error(notification: INotification): void
  alert(notification: INotification): void
  info(notification: INotification): void
}
