interface IArticle {
    title: string
    startTime: string
    endTime: string
}

type ArticleState = {
    articles: IArticle[]
}

type ArticleAction = {
    type: string
    article: IArticle,
    articleIndex?:number
}


type DispatchType = (args: ArticleAction) => ArticleAction
