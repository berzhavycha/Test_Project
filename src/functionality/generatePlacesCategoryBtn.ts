export function generetePlacesCategoryBtns(list: any[]) {
    return list.map((item: any) => (
        `<button class="category ${item.split(' ')[0]}">${item}</button>`
    ))
}

