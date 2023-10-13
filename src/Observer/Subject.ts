import { IPlace } from "../interfaces"
import { IObserver } from "./Observer"

export interface ISubject {
    getState(): ISubjectState,
    subscribeObserver(observer: IObserver): void,
    unsubscribeObserver(observer: IObserver): void,
    notifyObservers(state: ISubjectState): void
}

export interface ISubjectState {
    data: IPlace[],
    readonly error: string | null,
}

export class CSubject implements ISubject {
    private state: ISubjectState = { data: [], error: null }
    private observers: IObserver[] = []

    getState(): ISubjectState {
        return this.state
    }

    subscribeObserver(observer: IObserver): void {
        const isExist = this.observers.includes(observer)
        if (isExist) {
            throw new Error('Observer has already been subscribe')
        }
        this.observers.push(observer)
    }

    unsubscribeObserver(observer: IObserver): void {
        const observerIndex = this.observers.indexOf(observer)
        if (observerIndex > -1) {
            this.observers.splice(observerIndex, 1)
        } else {
            console.log('Observer doesn`t exist')
        }
    }

    notifyObservers(): void {
        for (const observer of this.observers) {
            observer.update(this)
        }
    }

    updateState(newState: ISubjectState): void {
        this.state = newState;
        this.notifyObservers();
    }
}
