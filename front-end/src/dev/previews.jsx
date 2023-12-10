import React from 'react'
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import TestAPI from "../TestAPI/TestAPI.jsx";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/TestAPI">
                <TestAPI/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews