# sanjay-os

SanjayOS is an extensible web application designed to appear like a mobile operating system. Some aspects are loosely inspired by the design of iOS.

In this system, webpages serve as applications in place of mobile apps. Users can use the built-in apps I've created, or add their own webpage URLs as apps. The currently completed built-in apps include: Messages, Clock, and Calculator.

I made this project to learn NextJS and TailwindCSS in a hands-on way, without any tutorials or lectures or guides. This project is my first time using both.

## Try It

Visit the live web app at [os.sanjayb.dev](https://os.sanjayb.dev).

## Messages App

### What Does It Do?
The Messages app allows you to chat with 3 different chatbot users, each with a different specialization and personality. The first is a general assistant, the second is a coding assistant, and the third is an artistic assistant. All three can respond with either text or a generated image, depending on what you ask them for.

Example prompt for general assistant:
```fix
What is the capital of the US?
```

Example prompt for coding assistant:
```fix
How do you print the Fibonacci sequence using Python?
```

Example prompt for artistic assitant:
```fix
Can you draw a grizzly bear surfing?
```

### How Does It Work?
Text generation in chats uses AI chatbot services with different starting system messages to configure the various personalities and specializations. Image generation uses AI image creation services to generate an image with a certain seed, with SanjayOS appending art style configuration to each prompt sent to the services -- the seed and art style can be changed using buttons on each generated image.

Perhaps the most impressive part of the system is how all 3 chatbot users can either generate a text response or image response for you, depending on what you ask for. How does SanjayOS know whether you want a text or image response? The secret is a fourth, behind-the-scenes chatbot user whose only role is to determine whether your prompt is a text prompt or an image prompt.

## Clock App

### What Does It Do?
The Clock app displays both analog and digital time in a selected timezone. Every timezone that works in a Javascript `Date` object in your browser is supported by the Clock app.

### How Does It Work?
The analog clock display is fully made with HTML, CSS, and Javascript; no images are used. The alignment of the numbers on the clock and creation of the minute/hour/second hands are simply CSS magic, feel free to look at the source code to see the specifics. The smooth movement of the clock hands is powered by CSS transition animations and very frequent time updates done by the Javascript code.

## Calculator App

### What Does It Do?
The Calculator app provides two graphing calculators, one scientific calculator, and one basic calculator that you can freely switch between. The state of each calculator is automatically saved locally, so your calculations will still be there if you switch to another calculator or close the webpage entirely.

### How Does It Work?
All four calculators utilize the Desmos API to render. If you've used Desmos, you may recognize the UI of the two graphing calculators, although I've used CSS to recolor them a little bit.

All four calculators also utilize the Desmos API to access their calculator state, which the app saves to `LocalStorage` right before you switch to another calculator or close the browser tab.

## Other Built-In Apps
The Camera and Draw apps are currently a work in progress, to be completed at some point in the future. I've not yet begun development on any of the other built-in apps on the home screen, but they will be added when I get the time.

## Run It Yourself
All of the source code for SanjayOS is provided in this repository, so you can download the code, run it yourself on your machine, and modify it however you'd like.

First, clone this repository to your computer.

Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.