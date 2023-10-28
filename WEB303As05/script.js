/*
    Assignment 05
    Dhruv Patel
*/

$(document).ready(function () {
    // Create the ContentItem class
    class ContentItem {
        constructor(id, name, description, categoryGenre) {
            this.id = id;
            this.name = name;
            this.description = description;
            this.categoryGenre = categoryGenre;
        }

        toString() {
            return `<div class="content-item-wrapper" id="content-item-${this.id}">
                <h2>${this.name}</h2>
                <p>${this.description}</p>
                <div>${this.categoryGenre}</div>
            </div>`;
        }
    }

    // Create an array of ContentItems
    const contentItems = [
        new ContentItem(0, "Tesla Model 3", "The Tesla Model 3 is an electric car designed for the mass market. It offers impressive performance, long-range electric range, and advanced autonomous driving capabilities. It has become one of the most popular electric cars in the world.", "Cars"),
        new ContentItem(1, "Toyota Camry", "The Toyota Camry is a midsize sedan known for its reliability and fuel efficiency. It's a popular choice for families and commuters, offering a comfortable ride and a range of features.", "sport-Cars"),
        new ContentItem(2, "Ford F-150", "The Ford F-150 is a best-selling pickup truck in the United States. It's known for its ruggedness and versatility, making it a top choice for both work and everyday use.", "sedan-Cars"),
        new ContentItem(3, "BMW 3 Series", "The BMW 3 Series is a luxury sports sedan that offers a blend of performance, comfort, and technology. It's a favorite among enthusiasts who appreciate its driving dynamics.", "suv-Cars"),
        new ContentItem(4, "Honda Civic", "The Honda Civic is a compact car known for its reliability and fuel efficiency. It's available in various body styles, including sedan, coupe, and hatchback.", "hatchback-Cars"),
    ];

    // Append content items to the #content-item-list
    contentItems.forEach(item => {
        $('#content-item-list').append(item.toString());
    });
});
