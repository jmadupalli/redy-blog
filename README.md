# redy-blog: NextJS + SpringBoot powered blog CMS

Live link/demo to the project: [Jay's Blog](https://blog.jayanthm.in)

redy-blog is a complete blog management system built with the robust combination of NextJS for a smooth frontend experience and SpringBoot for a powerful backend engine. It's packed with features to empower you to create and manage a stunning blog with ease.

## Key Features:

- Effortless Content Management:
  - User dashboard for effortless blog post creation, editing, and deletion.
- Customizable pagination: Show the perfect number of posts per page for your readers.
- Powerful Administration:
  - Manage users and configure your site with the dedicated admin dashboard.
  - Change site title, caption, and even control login button visibility.
- SEO Optimization:
  - Leverage server-side rendering for optimal search engine visibility.
  - Fine-tune your blog's SEO with customizable meta tags.
- Unwavering Security:
  - Secure JWT authentication protects your blog and user data.
- Content Creation Made Easy:
  - Feature-rich editor with markdown editing, code highlighting, and rich text formatting capabilities (powered by https://github.com/mdx-editor/editor).
- Stylish Interface:
  - TailwindCSS provides a clean and modern UI, powered by MambaUI and Shadcn themes.

And that's not all! redy-blog offers much more to make your blogging experience exceptional.

### Setup & Deploy Instructions

Generate required JWT Key using:

> node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"

Rename env-example-prod or env-example-dev to .env and update the values accordingly, example:

```
DB_HOST=postgres
DB_PORT=5432
DB_NAME=redy_blog
DB_USERNAME=dbuser
DB_PASSWORD=Test1234
SERVER_PORT=9003
API_PATH=/api
JWT_SECRET=[REPLACE_WITH_JWT_KEY_HERE]

UI_PORT=3003
NEXT_PUBLIC_API_URL=${API_PATH}
NEXT_INTERNAL_API_URL=http://redy-blog-api:${SERVER_PORT}${API_PATH}
```

### Docker Compose:

> docker compose up -d

### Docker teardown:

> docker compose down

Please use the develop branch if you need CORS (different ports/domain for backend and frontend).
I have disabled CORS in the main branch, you can enable it by uncommenting the necessary lines in SecurityConfig.java

> redy-blog UI will be live at: http://localhost:3003

> redy-blog API will be live at: http://localhost:9003/api

If you're using the main branch, please use the example nginx config to setup proxy pass accordingly. The application should then be accessible with same domain.

Once setup, the UI should redirect you to the onboarding page to setup the intial site details as well as admin credentials, and voila!

Here's a video/gif demo of the application:

![blog-demo-gif](demo/redy-blog-demo.gif)
