# BuildingMindsTest

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.3.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Notes

I have left some notes on the code, please have a look at them.

## Answers to questions

How would you handle 10,000+ entries?

```
Firstly, I would suggest to paginate the data at server level, so that we can fetch the data in chunks. If it's a requirement that we need to fetch all this amount of data at once, then we can use virtual scrolling to render only the visible items on the screen. Additionally, if we don't want the UI to freeze while processing/filtering the data on the client, then we can use web workers to offload the processing of the data.
```

How might you add a date filter later?

```
If we are to add another filter, we can directly add a date picker, and bind it to a new property on the state, and then use that property to filter the data.
If the date filter is global, then we can add it to the app state, otherwise we can add it to the feature state or even to the component state depending on the use case.
```
