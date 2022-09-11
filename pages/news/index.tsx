import { Box, Card, SxProps, Typography } from '@mui/material'
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

  const TypographySx: SxProps = {
    color: '#fff',
    fontWeight: 900,
    textShadow:
      '-1px -1px 0 #222, -1px 0 0 #222, -1px 1px 0 #222, 0 -1px 0 #222, 0 1px 0 #222, 1px 1px 0 #222, 1px 0 0 #222, 1px 1px 0 #222',
  }

  return (
    <Box sx={{ bgcolor: 'primary.main' }}>
      {props.topArticles.map((article) => (
        <Card sx={{ bgcolor: 'transparent' }}>
          <Typography sx={{ ...TypographySx, fontSize: '1.5rem' }}>{article.title}</Typography>
          <Box
            component='img'
            width={200}
            height={100}
            sx={{ objectFit: 'contain' }}
            src={article.urlToImage}
          />
          <Typography sx={{ ...TypographySx, fontSize: '1.4rem' }}>
            {article.description}
          </Typography>
        </Card>
      ))}
    </Box>
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
