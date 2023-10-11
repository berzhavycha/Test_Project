export function generatePlacesCategoryBtns(list: string[]) {
    return list.map((item: any) => (
        `<button class="category ${item.split(' ')[0]}">${item}</button>`
    ))
}

