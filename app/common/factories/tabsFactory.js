(function (){
    angular.module('neows').factory('tabs', [
        TabsFactory
    ])

    function TabsFactory() {
        function showTab(owner, {
            tabList = false,
            tabCreate = false,
            tabUpdate = false,
            tabDelete = false,
        }) {
            owner.tabList = tabList
            owner.tabCreate = tabCreate
            owner.tabUpdate = tabUpdate
            owner.tabDelete = tabDelete
        }

        return {showTab}
    }

})()