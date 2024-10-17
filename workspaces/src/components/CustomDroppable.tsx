import React, { ReactNode } from 'react';
import { Droppable, DroppableProps } from '@hello-pangea/dnd';

interface CustomDroppableProps extends Omit<DroppableProps, 'children'> {
  children: (provided: DroppableProvided) => ReactNode;
}

const CustomDroppable: React.FC<CustomDroppableProps> = ({ children, ...props }) => {
  return <Droppable {...props}>{children}</Droppable>;
};

export default CustomDroppable;