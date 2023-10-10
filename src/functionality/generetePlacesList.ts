export const generetePlacesList = (list: any[]) => {
    return list.map((item: any) => (
        ` 
        <div class="place-item ${item.categories[0].name.split(' ')[0]}">
            <div class="place-item-info">
                <h3>${item.name}</h3>
                <p class="categoty">${item.categories[0].name}</p>
                <p class="location"><i class="fa-solid fa-location-dot"></i> ${item.location.formatted_address}</p>
                <p class="distance"><i class="fa-solid fa-person-walking"></i> ${item.distanceToPlace} meters away</p>
            </div>
        </div>
    `
    ))
}