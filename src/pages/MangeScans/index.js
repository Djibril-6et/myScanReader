import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components/native";
import serverService from "../../services/server.service";
const path = require("path");
import Pdf from "react-native-pdf";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  deleteFromFavorites,
} from "../../redux/actions/favorites";
import { storePage, updateChapterPage } from "../../redux/actions/viewedpage";
import { Alert } from "react-native";
import I18n from "../../traduction/i18n";
import { LanguageContext } from "../../traduction/LanguageContext";
import notifee from "@notifee/react-native";

const Index = (props) => {
  const [mangaName, setMangaName] = useState("");
  const [chapters, setChapters] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState();
  const [horizontalView, setHorizontalView] = useState(false);

  const favList = useSelector((state) => state.favorites.favoritesList);
  const viewedPageList = useSelector(
    (state) => state.viewedpage.lastViewedPages
  );
  const dispatch = useDispatch();

  const [lastPage, setLastPage] = useState(0);

  const { language } = useContext(LanguageContext);

  useEffect(() => {
    setMangaName(props.route.params.mangaName);
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

  const delete_from_favorites = (id) => {
    dispatch(deleteFromFavorites(id));
  };

  const add_to_favorites = () => {
    const isAlreadyInList = favList.find(
      (element) => element.manga === mangaName
    );

    if (isAlreadyInList) {
      Alert.alert(
        mangaName,
        " is already in your favorites",
        [
          { text: "Close" },
          {
            text: "Remove",
            onPress: () => delete_from_favorites(mangaName),
          },
        ],
        { cancelable: false }
      );
    } else {
      dispatch(addToFavorites(mangaName));
    }
  };

  const handleNotification = async () => {
    await notifee.requestPermission();
    await notifee.createChannel({
      id: "default",
      name: "Default Channel",
    });

    await notifee.displayNotification({
      title: "My Scan Reader",
      body: I18n.t("finishChapter"),
      android: {
        channelId: "default",
      },
    });
  };

  const handleChangePage = (selectedChapter, page) => {
    if (viewedPageList.some((item) => item.id === selectedChapter)) {
      dispatch(updateChapterPage(selectedChapter, page));
    } else {
      dispatch(storePage(selectedChapter, page));
    }

    if(page == lastPage) handleNotification();
  };

  const [page, setPage] = useState(1);

  const getPageIndex = (chapter) => {
    if (viewedPageList.some((item) => item.id === chapter)) {
      foundItem = viewedPageList.find((item) => item.id === chapter);
      setPage(foundItem.page);
    } else {
      setPage(1);
    }
  };

  const getChapterBackgroundColor = chapter => {
    if (viewedPageList.some((item) => item.id === chapter)) {
      return "#A7A1D8"
    }
    else {
      return "#A9A9A9"
    }
  }

  return (
    <Container>
      <Banner
        source={{
          uri: `http://localhost:7001/scans/${mangaName}/banner.jpeg`,
        }}
      />

      <AddFavorites onPress={add_to_favorites}>
        <TextBtn>{I18n.t("add")}</TextBtn>
      </AddFavorites>

      <MangaContent>
        <Title>
          <MangaName>{mangaName}</MangaName>
        </Title>

        {chapters &&
          chapters.map((chapter) => (
            <ChapterButton
              key={chapter}
              bgColor={getChapterBackgroundColor(chapter)}
              onPress={() => {
                setSelectedChapter(chapter);
                getPageIndex(chapter);
                setModalVisible(!modalVisible);
              }}
            >
              <ChapterTitle>
                {I18n.t("chapter")} : {getFilename(chapter)}
              </ChapterTitle>
            </ChapterButton>
          ))}
      </MangaContent>

      <PdfModal visible={modalVisible} transparent={true}>
        <PdfContainer>
          <HeadView>
            <CloseModal onPress={() => setModalVisible(!modalVisible)}>
              <CloseText>{I18n.t("close")} </CloseText>
            </CloseModal>
            <SwitchView onPress={() => setHorizontalView(!horizontalView)}>
              <SwitchViewText>
                {horizontalView ? "Switch Vertical" : "Switch Horizontal"}
              </SwitchViewText>
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
              horizontal={horizontalView}
              spacing={10}
              enablePaging={true}
              style={{ backgroundColor: "#000" }}
              page={page}
              onLoadComplete={(numberOfPages) => setLastPage(numberOfPages)}
              onPageChanged={(page) => handleChangePage(selectedChapter, page)}
            />
          </PdfView>
        </PdfContainer>
      </PdfModal>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const Banner = styled.Image`
  width: 100%;
  height: 150px;
`;

const AddFavorites = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: ${(props) => props.theme.globalPrimaryColor};
  padding: 10px;
  border-radius: 5px;
`;

const TextBtn = styled.Text`
  color: #fff;
  font-weight: bold;
`;

const MangaContent = styled.ScrollView`
  flex: 1;
  padding: 30px;
  background-color: ${(props) => props.theme.primaryColor};
`;

const Title = styled.View`
  margin-bottom: 30px;
`;

const MangaName = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${(props) => props.theme.text};
`;

const ChapterButton = styled.TouchableOpacity`
  background-color: ${(props) => props.bgColor};
  padding: 20px;
  margin-bottom: 10px;
`;

const ChapterTitle = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

const PdfModal = styled.Modal``;

const PdfContainer = styled.View`
  flex: 1;
  background-color: #000;
`;

const HeadView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 30px 10px 10px 10px;
  background-color: ${(props) => props.theme.globalPrimaryColor};
`;

const CloseModal = styled.TouchableOpacity`
  height: 35px;
`;

const CloseText = styled.Text`
  color: #fff;
  font-size: 20px;
`;

const SwitchView = styled.TouchableOpacity`
  height: 35px;
`;

const SwitchViewText = styled.Text`
  color: #fff;
  font-size: 20px;
  text-align: right;
`;

const PdfView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ChapterPdf = styled(Pdf)`
  width: 100%;
  height: 100%;
`;

export default Index;
