import { styled } from "@edna-ui/react";
import Image from "next/image";

export const LeftColumn = styled("section", {
  display: "flex",
  flexDirection: "column",
  gap: "$6",
  borderRight: "1px solid #E3DBBD",
  paddingRight: "$6",

  "@md": {
    borderRight: "none",
  },

  "@sm": {
    marginBottom: "$6",
  },
});

export const Section = styled("div", {
  display: "flex",
  flexDirection: "column",
});

export const ScheduleContainer = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  width: "80%",
  marginBottom: "$2",

  "@sm": {
    width: "90%",
  },
});

export const RatingContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#FFF",
  border: "1px solid #E3DBBD",
  padding: "4px 10px",
  borderRadius: 20,
  gap: 4,
});

export const BannerImage = styled(Image, {
  width: "100%",
  height: "212px",
  overflow: "hidden",

  borderRadius: "$md",

  "@xl": {
    height: "190px",
  },

  "@lg": {
    height: "140px",
  },

  "@md": {
    height: "200px",
  },

  "@sm": {
    height: "140px",
  },
});

export const BannerPlaceholder = styled("div", {
  width: "100%",
  height: "212px",
  background: "linear-gradient(to bottom, #66ABA5, #F1B04E, #E26B5A)",

  border: "2px solid $base500",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  borderRadius: "$md",

  "@xl": {
    height: "190px",
  },

  "@lg": {
    height: "140px",
  },

  "@md": {
    height: "200px",
  },

  "@sm": {
    height: "140px",
  },
});

export const ProfileImage = styled(Image, {
  width: "160px",
  height: "160px",
  overflow: "hidden",
  marginTop: "-80px",
  marginLeft: "25px",

  border: "4px solid $base700",

  borderRadius: "$full",

  "@xl": {
    width: "140px",
    height: "140px",
    marginTop: "-70px",
    marginLeft: "20px",
  },

  "@lg": {
    width: "120px",
    height: "120px",
    marginTop: "-60px",
    marginLeft: "15px",
  },

  "@md": {
    width: "140px",
    height: "140px",
    marginTop: "-70px",
    marginLeft: "20px",
  },

  "@sm": {
    width: "100px",
    height: "100px",
    marginTop: "-50px",
    marginLeft: "15px",
  },
});

export const ProfileImagePlaceholder = styled("div", {
  width: "160px",
  height: "160px",
  marginTop: "-80px",
  marginLeft: "25px",

  background: "linear-gradient(to bottom, #66ABA5, #F1B04E, #E26B5A)",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  borderRadius: "$full",

  "@xl": {
    width: "140px",
    height: "140px",
    marginTop: "-70px",
    marginLeft: "20px",
  },

  "@lg": {
    width: "120px",
    height: "120px",
    marginTop: "-60px",
    marginLeft: "15px",
  },

  "@md": {
    width: "140px",
    height: "140px",
    marginTop: "-70px",
    marginLeft: "20px",
  },

  "@sm": {
    width: "100px",
    height: "100px",
    marginTop: "-50px",
    marginLeft: "15px",
  },
});
