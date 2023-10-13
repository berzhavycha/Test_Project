import { CPlacesModel } from "../models/place.model";
import { CPlaceView } from "../view/place.view";

export class CPlaceController {
    private model: CPlacesModel
    private view: CPlaceView

    constructor(model: CPlacesModel, view: CPlaceView) {
        this.model = model
        this.view = view

        this.view.bindFetchPlaces(this.handleFetchPlaces.bind(this))
        this.view.bindFilterPlaces(this.handleFilterPlaces.bind(this))
        this.model.subscribeObserver(this.view)
    }

    handleFetchPlaces(latitude: number, longitude: number) {
        try {
            if (isNaN(latitude) || isNaN(longitude)) {
                this.view.showErrorBlock("Invalid input. Please enter valid latitude and longitude.")
                return
            }

            this.model.memoizedFetchPlace(latitude, longitude)
        } catch (err) {
            if (err instanceof Error) {
                this.model.updateState({ data: [], error: err.message });
            }
        }
    }

    handleFilterPlaces(category: string) {
        this.model.filterPlaces(category)
    }
}