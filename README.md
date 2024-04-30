# What To Cook Today?

## Project Brief

Build a full-stack application from the ground up.

## App Description

What To Cook Today? Is an app which searches for recipes based on ingredients the user has in their kitchen. Users can save their favourite recipes for use later.

You can try it [here](https://whattocooktoday.vercel.app/)

![Landing Page](https://github.com/WAILENGL/whattocook/blob/main/Images/landing.png?raw=true)
![Recipe Details Page](https://github.com/WAILENGL/whattocook/blob/main/Images/favourites.png?raw=true)
![Favourites Page](https://github.com/WAILENGL/whattocook/blob/main/Images/recipedetails.png?raw=true)

## Technical Requirements

**Use 3rd party API and Airtable**

- Calling an API and displaying the data for the user. You may use any API of your choosing or [Find an available API here](https://github.com/public-apis/public-apis)
- You must use Airtable (but **NOT** the [airtable client](https://github.com/Airtable/airtable.js)) to store data.

**Use React framework** to build your application with _at least_

- 5 components
- 4 props
- 2 useStates
- 2 react router routes
- 1 lifting state, which is used to implement CRUD on the client side

Be styled such that the app looks and feels similar to apps we use on a daily basis - in other words, **it should have a consistent and polished user interface.**

Be **deployed online** (Vercel).

Have at least 1 CUD (**C**reates, **U**pdates, **D**elete) implementation using Airtable.

# IMPORTANT

You are required to use fetch for every RESTful API that you call. Under <b><i>NO</i></b> circumstances are you allowed to use Airtable or any other online database's SDK/API for doing CRUD.

### Languages and Technologies Used

For this project, I used the following:

```
- React
- HTML
- CSS
- Javascript
- Spoonacular APIs
- Airtable
- Github
- Bootstrap for React
- Bruno
- Trello

```

### Planning

I used Figma for wireframing and a Trello board to track my progress milestones.

Here is the skeleton of what the site should look like during the planning stage, as well as the user navigation flow:

[Figma Wireframe and planning](https://www.figma.com/file/3cH5Zltyij5tYB1Wu3nf6G/What-To-Cook-Today%3F?type=whiteboard&node-id=0-1&t=PwaOSbIUf4A0PDng-0)

### User Story

The user is a home cook who always wants to try something new with the common ingredients they have on hand. Sometimes they just don't want to cook the same things over and over, so they would like recipes that utilize what they have.

They would also like a way to save their favourite recipes so they can easily refer to them again in the future.

---

## Planning and Development Process

We had approximately 2 weeks from ideation to creation to develop our web application using React. Below is a rough estimation of how I had broken down my task lists:

**Week 1**

1. Researched and identified the API to be used (Spoonacular) and how it will be integrated into the site

2. Create Trello to map out and track user stories

3. Create wireframe in Figma for project

4. Set up the Github Repository for the project

5. Set up new Airtable for project

6. Set up Bruno to organize and test Spoonacular and Airtable API urls

**Week 2 Day 1**

1. Set up Vite project with React Router and Bootstrap framework for app

2. Created components

3. Created Navbar

**Week 2 Day 2**

1. Created the barebones version of the ingredient search page

2. Created an input field for user to input ingredients and have them be displayed in a list below the search bar. User could also remove items from the list

3. Created search button and API fetch for search results

**Week 2 Day 3**

1. Made a basic search results page to display results (Recipelist)

2. Set up route to Recipelist

3. Created a page to display recipe details (RecipeDetails) and route to the page

4. Linked Recipelist result cards to their respective RecipeDetails page

5. Created FavouriteButton

**Week 2 Day 4**

1. Created FavouriteRecipes Page and route

2. Created Fetch for Airtable API to display favourites in database

3. Started work on sending relevant data from recipe to Airtable

**Week 2 Day 5**

1. Created way to add to and delete favourites from Airtable

2. Linked functionality to favourites button

**Week 2 Day 6 onwards**

1. Styling and making site more user-friendly

### Problem-Solving Strategy

Creating the wireframe helped me visualize how my site would work, and allowed me to see what components and pages were needed for the project. Breaking them down into items on a Trello board helped me get a clearer idea of where to start and what to focus on to get going.

Before putting in a feature or function that might affect other parts of the site, I'd back up the existing component files in another folder, and restore the code if things went awry. Frequent commits to Github only with a working site also helped with ensuring there's always a back up.

During coding, aside from helpful classmates, Google and documentation like the MDN were my best friends.

### Challenges & Takeaways

In general, having to structure and code my first project after 2 weeks of learning React was a challenge. Unlike the first project where I could refer to others' work to see how they made the same parts of the game work, this time there were no similar references. Despite having a code-along project in class to refer to, structuring the project and implementing concepts like lifting state still took time for me to figure out for my own project.

One of the major challenges I faced in coding was figuring out how to remove recipes from favourites as I had initially assumed it would be a simple matter of removing the recipeid. That proved not to be the case and I had to work out that there was an Airtable ID for each record that my table didn't show, and use that to delete the record.

Overcoming these challenges helped me develop my problem solving skills in coding and a better appreciation for coding with others as working with classmates to figure out things like working with Airtable really sped up the learning process for me, despite us all working on different projects.

### Future Developments

Currently the search gets recipes that utilize the maximum number of ingredients entered, but not recipes that utilize only the ingredients entered. Upon researching further, it appears that the "strict" parameter needed to ensure that the recipes contain only the exact ingredients input is only available to paid users. I am looking into whether any client-side solutions are possible, such as using a filter method to filter out recipes that contain extra ingredients.

I am also looking into adding a notes section under the details of favourited recipes so users can make their own notes on it and any modifications they made.

## 3rd Party APIs Used

- [Spoonacular API](https://spoonacular.com/food-api/)
  - Find by Ingredients
  - Get Recipe Information

---

## Acknowledgments

I would like to thank Simon and Faith for their advice and guidance throughout this project. Also my SEI50 classmates who helped clarify and assisted me with issues I encountered. This project has reinforced my knowledge of React and helped me understand better how to plan out and structure a website.

---

## References

- https://developer.mozilla.org/en-US/
- https://stackoverflow.com/
- https://getbootstrap.com/docs/5.3
