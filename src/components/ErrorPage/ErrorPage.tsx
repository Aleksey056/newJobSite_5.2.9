
import { Box, Button, Text } from "@mantine/core"
import { Link } from "react-router"
import styles from './ErrorPage.module.css'

const ErrorPage = () => {
	return (
		<Box className={styles.page}>
			<Box className={styles.errorPage}>
				<Box className={styles.blockTitleAndutton}>
					<Box className={styles.blockText}>
						<Text className={styles.title}>
							Упс! Такой страницы не существует
						</Text>
						<Text className={styles.text}>
							Давайте перейдём к началу.
						</Text>
					</Box>
					<Link to='/'>
						<Button className={styles.button}>На главную</Button>
					</Link>
				</Box>
				<Box className="tenor-gif-embed" data-postid="12536795" data-share-method="host" data-aspect-ratio="1.90476" data-width="100%"><a href="https://tenor.com/view/sad-cat-lonely-upset-crying-gif-12536795">печальный кот плачет грустный GIF</a>from <a href="https://tenor.com/search/sad-gifs">Sad GIFs</a></Box> <script type="text/javascript" async src="https://tenor.com/embed.js"></script>
			</Box>
		</Box>

	)
}

export default ErrorPage