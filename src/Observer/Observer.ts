import { ISubject } from "./Subject"

export interface IObserver {
    update(subject: ISubject): void
}

