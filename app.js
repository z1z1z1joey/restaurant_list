//reuire pachages used in the project
const express = require('express')
const app = express()
const port = 8080
//require express-handlebars here
const exphbs = require('express-handlebars')
//require reataurant data
restaurantList = require('./restaurant.json')
//routes setting
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results });
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants: restaurants, keyword: keyword });
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.filter(
    restaurant => restaurant.id == req.params.restaurant_id
  )
  res.render('show', { restaurant: restaurant[0] });
})



//static files
app.use(express.static('public'))

//setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')


//start and listen on the Express server
app.listen(process.env.PORT || 8080, () => {
  console.log(`Express is listening on the localhost:${port}`)
})