import { IPlace } from "../interfaces";
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
        
        if (isNaN(latitude) || isNaN(longitude)) {

            if (this.view.errorBlock) {
                this.view.errorBlock.style.display = 'block'
            }

            return
        }

        this.model.memoizedFetchPlace(latitude, longitude)
    }

    handleFilterPlaces(category: string) {
        this.model.filterPlaces(category)
    }
}