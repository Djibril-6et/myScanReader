import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import styled from "styled-components";
import Header from "../../components/Header";
import serverService from "../../services/server.service";
const path = require("path");
import Pdf from "react-native-pdf";

const Index = (props) => {
  const [manga, setManga] = useState("");
  const [chapters, setChapters] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState();
  const [horizontalView, setHorizontalView] = useState(false);

  useEffect(() => {
    setManga(props.route.params.mangaName);
    serverService
      .getChapters(props.route.params.mangaName)
      .then((response) => {
        setChapters(
          response.data.filter((file) => path.extname(file) === ".pdf")
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const getFilename = (fileName) => {
    const filename = path.basename(fileName, ".pdf");
    return filename;
  };

  return (
    <Wrapper>
      <PdfModal visible={modalVisible} transparent={true}>
        <CenteredView>
          <HeadView>
            <CloseModal onPress={() => setModalVisible(!modalVisible)}>
              <CloseText>Close</CloseText>
            </CloseModal>
            <SwitchView onPress={() => setHorizontalView(!horizontalView)}>
              <SwitchViewText>{horizontalView ? ("Switch Vertical") : ("Switch Horizontal")}</SwitchViewText>
            </SwitchView>
          </HeadView>
          <PdfView>
            <ChapterPdf
              source={{
                uri: encodeURI(selectedChapter),
                cache: true,
              }}
              onError={(error) => {
                console.log(error);
              }}
              onPressLink={(uri) => {
                console.log(`Link pressed: ${uri}`);
              }}
              horizontal={horizontalView}
              spacing={10}
              enablePaging={true}
              style={{backgroundColor:"#0A0A0A"}}
            />
          </PdfView>
        </CenteredView>
      </PdfModal>

      <Banner
        source={{ uri: `http://localhost:7001/scans/${manga}/banner.jpeg` }}
      />
      <MangaContent>
        <Title>
          <MangaName>{manga}</MangaName>
        </Title>

        {chapters &&
          chapters.map((chapter) => (
            <>
              <BtnChapter
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setSelectedChapter(chapter);
                }}
              >
                <Chapter>Chapter : {getFilename(chapter)}</Chapter>
              </BtnChapter>
            </>
          ))}
      </MangaContent>
      <HeaderView />
    </Wrapper>
  );
};

const Wrapper = styled.View`
  height: 100%;
  width: 100%;
`;

const Banner = styled.Image`
  width: 100%;
  height: 150px;
`;

const MangaContent = styled.ScrollView`
  width: 90%;
  margin: 20px auto 0 auto;
`;

const Title = styled.View`
  height: 70px;
`;
const MangaName = styled.Text`
  color: white;
  margin: auto 0;
  font-size: 30px;
`;

const BtnChapter = styled.TouchableOpacity``;

const Chapter = styled.Text`
  color: white;
`;

const PdfModal = styled.Modal``;

const CenteredView = styled.View`
  /* flex: 1; */
  width: 100%;
  height: 100%;
  /* justify-content: center; */
  align-items: center;
  background-color: ${(props) => props.theme.black};
`;

const HeadView = styled.View`
  width: 100%;
  height: 80px;
  background-color: ${(props) => props.theme.primaryGrey};
  display; flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CloseModal = styled.TouchableOpacity`
  height: 35px;
  width: 15%;
  margin: auto 0 0 10px;
`;

const CloseText = styled.Text`
  color: white;
  margin: auto 0;
  font-size: 20px;
`;

const SwitchView = styled.TouchableOpacity`
  height: 35px;
  width: 40%;
  margin: auto 10px 0 0;
`;

const SwitchViewText = styled.Text`
  color: white;
  margin: auto 0;
  font-size: 15px;
  text-align: right;
`;

const PdfView = styled.View`
  width: 100%;
  height: 100%;
`;

const ChapterPdf = styled(Pdf)`
  width: 99%;
  height: 95%;
  margin: 0 auto;
`;

const TextModal = styled.Text`
  color: #fff;
`;

const HeaderView = styled(Header)``;

export default Index;
