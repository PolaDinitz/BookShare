export const allBooks = [
    {
        id: 1,
        title: 'Harry Potter and the Philosophers Stone',
        author: 'Rowling, J K',
        description: `This story is filled with dark comedy and crafted with a quality of writing that has garnered J.K. Rowling top awards in her country and ours. Harry Potter spent ten long years living with his aunt and uncle and stupid cousin, Dudley. Fortunately, Harry has a destiny that he was born to fulfill. One that will rocket him out of his dull life and into a unique experience at the Hogworts School of Witchcraft and Wizardry.`,
        cover_img: 'https://cdn.shopify.com/s/files/1/2181/2535/products/76813c8d0218cab5137b190541dce431_x700.gif?v=1514210268',
        genres: ['Fantasy', 'Adventure'],
    },
    {
        id: 2,
        title: 'Harry Potter and the Deathly Hallows',
        author: 'Rowling, J K',
        description: `In the seventh and final installment of the epic Harry Potter series, seventeen-year-old Harry embarks on the mission of finding and destroying Voldemort's Horcruxes. During his travels, Harry becomes distracted by the seductive allure of the Deathly Hallows and learns surprising secrets of Dumbledore's past.`,
        cover_img: 'https://cdn.shopify.com/s/files/1/2181/2535/products/02e5ee995b80d61e09a9849df5c83513_x700.gif?v=1514210286',
        genres: ['Fantasy', 'Adventure'],
    },
    {
        id: 3,
        title: 'Harry Potter and the Goblet of Fire',
        author: 'Rowling, J K',
        description: `Harry Potter is midway through his training as a wizard and his coming of age. Harry wants to get away from the pernicious Dursleys and go to the International Quidditch Cup. He wants to find out about the mysterious event that's supposed to take place at Hogwarts this year, an event involving two other rival schools of magic, and a competition that hasn't happened for a hundred years. He wants to be a normal, fourteen-year-old wizard. But unfortunately for Harry Potter, he's not normal - even by wizarding standards. And in his case, different can be deadly.`,
        cover_img: 'https://cdn.shopify.com/s/files/1/2181/2535/products/4cde5180f81b9291376ec28b0c60f211_x700.gif?v=1514210277',
        genres: ['Fantasy', 'Adventure'],
    },
    {
        id: 4,
        title: 'Harry Potter and the Order of the Phoenix',
        author: 'Rowling, J K',
        description: `The book that took the world by storm....In his fifth year at Hogwart's, Harry faces challenges at every turn, from the dark threat of He-Who-Must-Not-Be- Named and the unreliability of the government of the magical world to the rise of Ron Weasley as the keeper of the Gryffindor Quidditch Team. Along the way he learns about the strength of his friends, the fierceness of his enemies, and the meaning of sacrifice.`,
        cover_img: 'https://cdn.shopify.com/s/files/1/2181/2535/products/fe4d33b76d404830c2efb1520c609fb4_x700.gif?v=1514210281',
        genres: ['Fantasy', 'Adventure'],
    }
]

export type BookType = {
    id: number,
    title: string,
    author: string,
    description: string,
    cover_img: string,
    genres: string[],
}