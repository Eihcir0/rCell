import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Cell from '../Cells/Cell'

class Row extends React.Component {
    static propTypes = {
        totalCols: PropTypes.number.isRequired,
        row: PropTypes.number.isRequired,
        values: PropTypes.array.isRequired,
    }

    renderCells = () => {
        let cols = []
        for (let colIdx = 0; colIdx < this.props.totalCols; colIdx++) {
            let isEditing = this.props.editingLocation === colIdx
            const cellEditorStartingValue = isEditing ? this.props.cellEditorStartingValue : undefined
            cols.push(
                <Cell
                    key={colIdx}
                    col={colIdx}
                    row={this.props.row}
                    isCursor={this.props.cursorLocation === colIdx}
                    isEditing={isEditing}
                    cellEditorStartingValue={cellEditorStartingValue}
                    displayValue={this.props.values[colIdx].displayValue}
                    enteredValue={this.props.values[colIdx].enteredValue}
                />
            )
        }
        return cols
    }

    render() {
        const shift = this.props.gridShifted && this.props.row % 2 !== 0 
        return (
            <div className={`row${shift ? '-shifted' : ''}`}>
                {this.renderCells()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        totalCols: state.grid.totalCols,
        gridShifted: state.grid.gridShifted,
    }
}

export default connect(
    mapStateToProps,
)(Row)