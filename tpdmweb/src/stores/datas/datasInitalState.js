
// var oDocument01 = {
//     id: 1,
// 	name: "Document01",
// 	documentId: "document01_000001",
// 	type: {
// 		id: 1,
// 		name: "TXT File"
// 	},
// 	status: {
// 		id: 1,
// 		name: "InWork"
// 	},
// 	files:[{
// 		id: 1,
// 		name:"doc1.txt",
// 		path:"/project/folder/doc1.txt"
// 	}],
// 	revision: "1",
// 	rights: null,
// 	workflow: null,
// 	lifecycle: null,
// 	locked: false,
// 	userLock: null,
// 	description: "description"
// }


// var oFolder01 = {
//     id: 1,
//     phaseId: 1,
//     phaseName: "Commercial",
//     documents: [oDocument01]
// }

// var oFolder02 = {
//     id: 2,
//     phaseId: 2,
//     phaseName: "Management",
//     documents: []
// }

// var oFolder03 = {
//     id: 3,
//     phaseId: 3,
//     phaseName: "Design",
//     documents: []
// }

// var oFolder04 = {
//     id: 4,
//     phaseId: 4,
//     phaseName: "Launch",
//     documents: []
// }

// var oProjectWorkflow01 = {
// 	template: null,
// 	task: null,
// 	projectLeader: null,
// 	projectAttached: null,
// 	comments: "",
// 	tasks: []
// }

// var oProject01 = {
//     id: 3,
//     name: "Project1615215944839",
//     projectId: "1615215944839",
//     status: {
//       id: 1,
//       name: "Initiated",
//       created_at: "2021-03-08T10:50:11.357Z",
//       updated_at: "2021-03-08T10:50:11.372Z",
//     },
//     startDate: "2021-03-08",
//     finishDate: null,
//     created_at: "2021-03-08T15:06:04.705Z",
//     updated_at: "2021-03-08T15:06:04.734Z",
//     team: [
//     //   {
//     //     id: 1,
//     //     username: "manager1",
//     //     email: "manager1@incremental.com",
//     //     provider: "local",
//     //     confirmed: true,
//     //     blocked: false,
//     //     role: 1,
//     //     created_at: "2021-03-06T14:52:02.927Z",
//     //     updated_at: "2021-03-06T14:52:02.943Z",
//     //   },
//     ],
//     folders: [ oFolder01, oFolder02, oFolder03, oFolder04 ],
//     workflow: null
//   }

// var aProjectsList = [ oProject01 ];


// export const initialState = {
// 	workSpace: {},
//     projects: aProjectsList,
//     projectsworkflows: [],
//     folders: [],
//     documents: [],
//     documentsworkflows: [],
//     tasks: [],
// 	errors: [],

// }

/* Good Init Values */
export const initialState = {
	workSpace: {},
    projects: [],
    projectsworkflows: [],
    folders: [],
    documents: [],
    documentsworkflows: [],
    tasks: [],
	errors: [],
    originalDocumentDescription: "",
    showDescription: false
}