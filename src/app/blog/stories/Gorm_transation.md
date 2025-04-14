20240725
Software
# Gorm doesn't support distributed transaction
## Origin
One day, I find the something code in our project:
```
# Go
dbs.Transaction(func(dbs map[string]*gorm.DB){
  dbs[A].xxxx
  dbs[B].xxxx
})
```
Cool! I can't help but think about:
The senior is powerful, how did he make gorm.Dbs in same transaction?

Let's deep into dbs.Transaction,
```
# Go
// I expand it for readibility
dbs[A].Transaction(func(txA *gorm.DB) error {
  if err = dbs[B].Transaction(func(txB *gorm.DB) error {
    // The func(dbs map[string]*gorm.DB){} actions
    if err = txA.xxx(); err != nil{
      return err
    }
    if err = txB.xxx(); err != nil{
      return err
    }
  }); err != nil{
    return err
  }
})
```
When I first see it, it seems make sense, if some action failed, all dbs will rollback. 

But, if network failures occur between two db commit?

## Problem
A transaction has 3 steps:
1. Begin transaction(Lock)
2. Perform Operation(Prepare)
3. Commit or Rollback Transaction(Release lock)

Consider our case:
1. Begin transaction A
2. Begin transaction B
3. Perform A and B actions
4. Commit B
5. Commit A

If network failures between step4 and step5, this casue the intermediate state:
- Action B is commit but A will not
- Action B release the lock can be accessed by other transactions