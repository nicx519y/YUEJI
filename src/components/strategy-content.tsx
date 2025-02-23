import { HStack } from "@chakra-ui/react";
import styled from "styled-components";

const FirstStrategy = styled.div`
    width: 500px;
    height: 280px;
    background-image: url("/yoga-pic1.png");
`;

const SecondStrategy = styled.div`
    width: 155px;
    height: 280px;
`;

const StrategyTitle = styled.div`
    eight: 600;
    font-size: 18px;
    color: #FFFFFF;
    line-height: 18px;
    text-align: left;
    font-style: normal;
    padding: 0px 16px;
`;


export default function StrategyContent() {
    return (
        <HStack gap="20px">
            <FirstStrategy>
                <StrategyTitle style={{ marginTop: "222px" }} >主心脏</StrategyTitle>
            </FirstStrategy>
            <SecondStrategy style={{ backgroundImage: "url('/yoga-pic2.png')" }} >
                <StrategyTitle style={{ marginTop: "246px", textAlign: "center" }} >主气脉</StrategyTitle>
            </SecondStrategy>
            <SecondStrategy style={{ backgroundImage: "url('/yoga-pic3.png')" }} >
                <StrategyTitle style={{ marginTop: "246px", textAlign: "center" }} >主运化</StrategyTitle>
            </SecondStrategy>
            <SecondStrategy style={{ backgroundImage: "url('/yoga-pic4.png')" }} >
                <StrategyTitle style={{ marginTop: "246px", textAlign: "center" }} >主疏通</StrategyTitle>
            </SecondStrategy>
            <SecondStrategy style={{ backgroundImage: "url('/yoga-pic5.png')" }} >
                <StrategyTitle style={{ marginTop: "246px", textAlign: "center" }} >主身心</StrategyTitle>
            </SecondStrategy>
        </HStack>
    )
}
