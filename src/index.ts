import { CPlacesModel } from "./models/place.model";
import { CPlaceView } from "./view/place.view";
import { CPlaceController } from "./controllers/place.controller";

const app = new CPlaceController(new CPlacesModel(), new CPlaceView())