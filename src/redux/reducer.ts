import * as actionTypes from "./actionTypes"

const initialState: ArticleState = {
    articles: [
        {
            title: 'Make Breakfast',
            startDate: '2021-09-19T08:43:24.198Z',
            endDate: '2021-09-19T08:43:24.198Z',
        },
        {
            title: 'Dress the Bed',
            startDate: '2021-09-19T08:43:24.198Z',
            endDate: '2021-09-19T08:43:24.198Z',
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
                startDate: action.article.startDate,
                endDate: action.article.endDate,
            }
            return {
                ...state,
                articles: state.articles.concat(newArticle),
            }
        case actionTypes.REMOVE_ARTICLE:
            const updatedArticles: IArticle[] = state.articles.filter(
                article => article.title !== action.article.title
            )
            return {
                ...state,
                articles: updatedArticles,
            }
    }
    return state
}

export default reducer