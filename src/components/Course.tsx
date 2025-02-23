'use client'

import { Heading } from "@chakra-ui/react";
import styled from "styled-components";

const CourseContainer = styled.div`
    width: 100%;
    height: 100%;
`;

const CurseTitle = styled.div`
    width: 100%;
    height: 50px;
    font-size: 22px;
    font-weight: 600;
    color: #471A00;
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
`;

const CurseContent = styled.div`
    width: 100%;
    height: 100%;
`;

const TitleIcon = styled.div`
    width: 4px;
    height: 20px;
    background-color: #FC5A01;
    display: inline-block;
    margin-top: 2px;
`;


export default function Course({
  title,
  children
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <CourseContainer>
        <CurseTitle>
          <TitleIcon />
          <Heading as="h2" fontSize="22px" fontWeight="600" color="#471A00" flex={1} lineHeight="22px" >
            {title}
          </Heading>
        </CurseTitle>

        <CurseContent>
          {children}
        </CurseContent>
    </CourseContainer>
  );
} 