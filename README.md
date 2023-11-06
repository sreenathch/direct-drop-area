# direct-drop-area
react based component converting the element to a drop zone for file upload or manipulations supporting direct web image drop

### Installation

```sh
$ git clone https://github.com/sreenathch/direct-drop-area.git
$ cd direct-drop-area
$ yarn install
```

### Scripts
```
Running locally
$ yarn start
```

### Usage
```
const acceptedFilesType = 'image/*' // accepted file types
<DirectDropArea
    dontRead
    accept={acceptedFilesType}
    onDrop={(file) => {
        console.log(file)
    }}
    handleClick={false}>
    {({ over, overDocument }) => (
        <div
            style={{
                ...(over
                    ? { opacity: '50%', border: '1px dashed #259925' }
                    : {}),
                width: '600px',
                height: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >this is a drop zone </div>)}
</DirectDropArea>
```
