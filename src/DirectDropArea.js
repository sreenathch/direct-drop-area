import React, {useEffect, useState, useRef} from 'react'

const anyUrlToFile = (url, filename, mimeType) =>
    fetch(url, {mode: 'no-cors'})
        .then((res) => res.arrayBuffer())
        .then((buffer) => new File([buffer], filename, {type: mimeType}))

const readFileAsText = (file, encoding = INPUT_ENCODING) => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsText(file, encoding)
})

const openFile = (options = {}) => new Promise((resolve, reject) => {
    const input = document.createElement('input')

    if (options.multiple) input.setAttribute('multiple', '')

    if (options.accept) input.setAttribute('accept', options.accept)

    input.setAttribute('type', 'file')
    input.style.display = 'none'

    input.addEventListener('change', (ev) => {
        if (input.files.length) {
            if (options.multiple) resolve(input.files)
            else resolve(input.files[0])
        } else {
            reject(ev)
        }
        input.remove()
    })

    document.body.appendChild(input)

    const event = document.createEvent('MouseEvent')
    event.initMouseEvent(
        'click',
        false,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
    )
    input.dispatchEvent(event)
    input.click()
})


let directDropArea = []
const events = {
    drag: 'onDrag',
    dragstart: 'onDragStart',
    dragend: 'onDragEnd',
    dragover: 'onDragOver',
    dragenter: 'onDragEnter',
    dragleave: 'onDragLeave',
    drop: 'onDrop'
}

// Don't run in SSR mode
if (globalThis.document !== undefined) {
    Object.keys(events).forEach((event) => {
        document.addEventListener(event, (ev) => {
            directDropArea.forEach((zone) => zone[events[event]] && zone[events[event]](ev, true))
        })
    })
}

const DirectDropArea = (props: {
    handleClick: Boolean,
    dontRead: Boolean,
    onDrop: Function
}) => {
    const {
        handleClick = true,
        dontRead = false,
        multiple = false,
        onDrop = (file, text) => {
        },
        children
    } = props
    const [overDocument, setOverDocument] = useState(false)
    const [over, setOver] = useState(false)
    const elementRef = useRef(null)
    let timeout
    const setDragOver = (value, document) => {
        if (value === false && document) {
            timeout = setTimeout(() => setOverDocument(false, 75))
        } else if (value === true && document) {
            timeout = clearTimeout(timeout)
            setOverDocument(true)
        } else {
            setOver(value)
        }
    }

    const triggerOnDrop = (file) => {
        if (dontRead || multiple) {
            onDrop(file, undefined)
            return
        }

        readFileAsText(file)
            .catch((err) => Promise.resolve(undefined))
            .then((text) => onDrop(file, text))
    }
    useEffect(() => {
        directDropArea.push(elementRef)
        return () => {
            Object.keys(events).forEach((event) => {
                document.removeEventListener(event, (ev) => {
                    directDropArea.forEach((zone) => zone[events[event]](ev, true))
                })
            })
            directDropArea = []
        }
    })
    const onClick = (event) => {
        openFile(props).then((file) => triggerOnDrop(file))
        event.stopPropagation()
    }
    const onDrag = (event, document) => {
        if (document) return
        event.preventDefault()
    }
    const onDragStart = (event, document) => {
        if (document) return
        event.preventDefault()
    }
    const onDragOver = (event, document) => {
        event.preventDefault()
        setDragOver(true, document)
    }
    const onDragEnter = (event, document) => {
        event.preventDefault()
        setDragOver(true, document)
    }
    const onDragEnd = (event, document) => {
        event.preventDefault()
        setDragOver(false, document)
    }
    const onDragLeave = (event, document) => {
        event.preventDefault()
        setDragOver(false, document)
    }
    const onDropint = async (event, document) => {
        event.preventDefault()
        setDragOver(false, document)
        if (document) return

        let file = event.dataTransfer.items
            ? [...event.dataTransfer.items].map((i) => i.getAsFile())
            : event.dataTransfer.files
                ? event.dataTransfer.files[0]
                : undefined
        const imageURL = event?.dataTransfer?.getData('URL')
        if (imageURL?.length) {
            const f = await anyUrlToFile(imageURL, 'reUpload.jpeg', 'image/jpeg')
            if (multiple) file = f
            else file[0] = f
        }
        if (file) triggerOnDrop(file)
    }

    const flagHandleClick = handleClick === true

    const render = children({over, overDocument})
    const newprops = {
        onDrag,
        onDragStart,
        onDragEnd,
        onDragOver,
        onDragEnter,
        onDragLeave,
        onDrop: onDropint,
        ref: elementRef
    }
    if (flagHandleClick) newprops.onClick = onClick

    return React.cloneElement(render, newprops)
}

export default DirectDropArea
