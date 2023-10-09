import { Project as ProjectInterface } from "@/interfaces/project";
import { gql } from "@apollo/client";
import { createSlice } from "@reduxjs/toolkit";

const FETCH_PROJECTS = gql`
    query {
        listProjects {
            id
            title
            description
        }
    }
`;

const initialState: { projects: ProjectInterface[] } = {
    projects: [],
};

export const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        setProjects: (state, action) => {
            state.projects = action.payload;
        },
        deleteProject: (state, action) => {
            state.projects = state.projects.filter((project) => project.id != action.payload);
        },
        pushNewProject: (state, action) => {
            state.projects.push(action.payload);
        },
    },
});

export const { setProjects, deleteProject, pushNewProject } = projectSlice.actions;

export default projectSlice.reducer;
