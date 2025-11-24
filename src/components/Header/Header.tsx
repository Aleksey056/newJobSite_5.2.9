import { Box, Text, Image } from '@mantine/core'
import logo from '../../assets/logo_hh.svg'
import userLogo from '../../assets/user-circle.svg'
import ellipse from '../../assets/Ellipse.svg'
import styles from './Header.module.css'
import { Link } from 'react-router'

export default function Header() {
	return (
		<Box className={styles.header}>
			<Box>
				<Box className={styles.header__logo}>
					<Image className={styles.header__icon} src={logo} alt='logo' />
					<Text className={styles.text}>
						.FrontEnd
					</Text>
				</Box>
			</Box>
			<Box className={styles.block2}>
				<Box className={styles.jobs}>
					<Link to='/' className={styles.jobs__text}>
						Вакансии FE
					</Link>
					<Image className={styles.ellipse} src={ellipse} />
				</Box>
				<Box className={styles.userInfo}>
					<Image className={styles.userInfo__image} src={userLogo} alt='userLogo' />
					<Text className={styles.userInfo__text}>Обо мне</Text>
				</Box>
			</Box>
		</Box>
	)
}
