interface IArticle {
    title: string
    startDate: string
    endDate: string
}

type ArticleState = {
    articles: IArticle[]
}

type ArticleAction = {
    type: string
    article: IArticle
}

type DispatchType = (args: ArticleAction) => ArticleAction