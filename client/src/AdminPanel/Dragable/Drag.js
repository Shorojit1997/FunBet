import React from 'react';
import Draggable from 'react-draggable';
const Drag = () => {

   const eventControl = (event, info) => {
        console.log('Event name: ', event.type);
        console.log(event, info);
    }
    return (
        <Draggable
        onDrag={this.eventControl}
        onStart={this.eventControl}
        onStop={this.eventControl}
        onMouseDown={this.eventControl}
        onMouseUp={this.eventControl}
        onTouchStart={this.eventControl}
        onTouchEnd={this.eventControl}>
      <div className="drag-wrapper">
        <div>You can drag me now.</div>
      </div>
    </Draggable>
    );
};

export default Drag;