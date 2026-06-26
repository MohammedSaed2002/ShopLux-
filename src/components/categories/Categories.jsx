import { Category } from "@mui/icons-material";
import { Box, CircularProgress, Typography } from "@mui/material";
import { Query, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react"
import useCategories from "../hooks/useCategories";

    export default function Categories() {

      const{data,error,isLoading,isError,} = useCategories();

  if(isLoading) return <CircularProgress/>
  if(error) return <Typography color="red">{error}</Typography>
  return (

    <div>
    {data.response.data.map( (Category)=><Box> <Typography> {Category.name} </Typography> </Box> )}        
    </div>

  )

}