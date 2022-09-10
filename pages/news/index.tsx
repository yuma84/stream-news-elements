import { NextPage } from 'next'

type Article = {
  title: string
  description: string
  urlToImage: string
}

type Props = {
  topArticles: Article[]
}

const NewsPage: NextPage<Props> = (props: Props) => {
  console.log(props.topArticles)

  return (
    <div>
      {props.topArticles.map((article) => (
        <div>
          <p>{article.title}</p>
          <img width={200} height={100} src={article.urlToImage} />
          <p>{article.description}</p>
        </div>
      ))}
    </div>
  )
}

export const getStaticProps = async () => {
  const pageSize = 20
  const topRes = await fetch(
    `https://newsapi.org/v2/top-headlines?country=jp&pageSize=${pageSize}&apiKey=${process.env.NEWS_API_KEY}`,
  )
  const topJson = await topRes.json()
  const topArticles = topJson?.articles

  return {
    props: {
      topArticles,
    },
    revalidate: 60 * 10,
  }
}

export default NewsPage
