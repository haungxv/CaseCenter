export default {
    setCaseReview_noSee(state, val) {
        //设置未审核案件
        state.caseReview_noSee = val;
    },
    setCaseReview_yes(state, val) {
        //设置审核通过案件
        state.caseReview_yes = val;
    },
    setCaseReview_no(state, val) {
        //设置审核未通过案件
        state.caseReview_no = val;
    },
    setStayCase(state, val) {
        //设置待办案件
        state.stayCase = val;
    },
    setWorkCase(state, val) {
        //设置在办案件
        state.workCase = val;
    },
    setHistoryCase(state, val) {
        //设置历史案件
        state.historyCase = val;
    },
    setFileCase(state, val) {
        //设置归档案件
        state.fileCase = val;
    }
}