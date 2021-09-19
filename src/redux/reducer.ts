import * as actionTypes from "./actionTypes"

const initialState: ArticleState = {
    articles: [
        {
            title: 'Make Breakfast',
            startTime: '2021-09-19T08:43:24.198Z',
            endTime: '2021-09-19T09:43:24.198Z',
        },
        {
            title: 'Dress the Bed',
            startTime: '2021-09-19T08:43:24.198Z',
            endTime: '2021-09-19T12:43:24.198Z',
        },
    ],
}

const reducer = (
    state: ArticleState = initialState,
    action: ArticleAction
): ArticleState => {
    switch (action.type) {      
        case actionTypes.ADD_ARTICLE:
            const newArticle: IArticle = {
                title: action.article.title, // not really unique
                startTime: action.article.startTime,
                endTime: action.article.endTime,
            }
            let newArticles = state.articles;
            newArticles.unshift(newArticle)
            state.articles = [...newArticles]
            return {
                ...state
            }
        case actionTypes.REMOVE_ARTICLE:
            const updatedArticles: IArticle[] = state.articles.filter(
                (article, index) => index !== action.articleIndex
            )
            state.articles = [...updatedArticles]
            return {
                ...state
            }
        case actionTypes.UPDATE_ARTICLE:
            let allArticles = state.articles;
            allArticles[action.articleIndex || 0] = action.article;
            state.articles = [...allArticles]
            return {
                ...state,

            }
        default:
            return state;
    }
    return state
}

export default reducer