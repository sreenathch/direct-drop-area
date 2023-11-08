# direct-drop-area
react based component converting the element to a drop zone for file upload or manipulations supporting direct web image drop
Supporting multiple drop as well

![sample](./direct-drop-area.gif)

### Installation


```shell
npm i direct-drop-area
```

```javascript
import { DirectDropArea } from 'direct-drop-area'
const acceptedFilesType = 'image/*'; // accepted file types
(<DirectDropArea
    dontRead
    accept={acceptedFilesType}
    onDrop={(file) => console.log(file)}
    handleClick={false}>
    {({over, overDocument}) => (
        <div
            style={{
                width: '600px',
                height: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: "5px solid black",
                ...(over
                    ? {opacity: '50%', border: '5px dashed #259925'}
                    : {}),
            }}
        >
            this is a drop zone 
        </div>)}
</DirectDropArea>)
```

### For contributions 

```shell
$ git clone https://github.com/sreenathch/direct-drop-area.git
$ cd direct-drop-area
$ yarn install
```


### Scripts
Running locally
```Shell
$ yarn start
```


