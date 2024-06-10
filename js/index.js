document.addEventListener('DOMContentLoaded', () => {
	const navItems = document.querySelectorAll('.nav__item')
	const sections = document.querySelectorAll('section[data-section]')
	const mobileButton = document.querySelector('.mobile__button')
	const mobileNav = document.querySelector('.mobile__nav')

	navItems.forEach(item => {
		item.addEventListener('click', () => {
			const section = document.querySelector(
				`section[data-section="${item.dataset.section}"]`
			)
			section.scrollIntoView({ behavior: 'smooth' })

			// Закрытие мобильного меню при нажатии на кнопку
			if (mobileNav.classList.contains('active')) {
				mobileNav.classList.remove('active')
				mobileButton.classList.remove('active')
			}
		})
	})

	const observer = new IntersectionObserver(
		entries => {
			entries.forEach(entry => {
				const navItem = document.querySelector(
					`.nav__item[data-section="${entry.target.dataset.section}"]`
				)
				if (entry.isIntersecting) {
					navItems.forEach(item => item.classList.remove('active'))
					navItem.classList.add('active')
				}
			})
		},
		{ threshold: 0.5 }
	)

	sections.forEach(section => {
		observer.observe(section)
	})

	// бургер меню
	mobileButton.addEventListener('click', () => {
		mobileNav.classList.toggle('active')
		mobileButton.classList.toggle('active')
	})
})
