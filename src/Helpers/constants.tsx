/* eslint-disable import/prefer-default-export */
export const gradientCardsArray = [
  {
    icon: 'fa-solid fa-star icon fa-2x',
    title: 'What is Dans App?',
    about: `A comprehensive platform that combines a vast
    database of past event data with advanced
    predictive algorithms`,
  },
  {
    icon: 'fa-solid fa-star icon fa-2x',
    title: 'A wealth of information',
    about: 'We provide hidden patterns and trends of the fight game, then using this we make accurate predictions about future fights',
  },
  {
    icon: 'fa-solid fa-star icon fa-2x',
    title: 'Above and beyond',
    about: 'Through intense data analysis, we have found massively impacting fight factors that our competitors and Vegas havent noticed',
  },
]

export const pricingCards = [
  {
    title: 'Next event',
    description: 'Revolutionize your fight night experience with our single fee access.',
    fee: '£5.00',
    included: ['In depth statistics for each fight on said card', 'Access to fight card stats on purchase'],
  },
  {
    title: 'Annual',
    description: 'Never worry about forgetting to buy the single subscription again with an annual one off subcription',
    fee: '£40.00',
    included: ['In depth statistics for each fight on said card', 'Access to fight card stats on the Monday of each fight week', 'Post fight card roundup deep dive into results'],
  },
]

export const defaultUserSignUpState = {
  email: '',
  username: '',
  first_name: '',
  last_name: '',
  password: '',
  password_confirm: '',
}

export const defaultUserLoginState = {
  username: '',
  password: '',
}
