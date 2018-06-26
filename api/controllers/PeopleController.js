/**
 * PeopleController
 *
 * @description :: Server-side logic for managing people
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	view: function (req,res) {
		return People.find({active:true}).then(function (peoples) {
			return res.view('peoples/all',{
				peoples: peoples
			});
		});
	},

	report: function (res,res) {
		return res.view('peoples/report');
	},

	check: function (req,res) {
		if (!req.params.id) return res.badRequest('Não foi informado ID!');


		return Check.findOne({
			people:req.params.id,
			status: 'open'
		}).then(function (check) {
			var promise;
			if (!check) {
				promise = Check.create({
					people: req.params.id
				});
			} else {
				check.status = 'closed';
				promise = check.save().then(function () {
					return check;
				});
			}

			return promise.then(function (check) {
				return People.update({
					id: req.params.id
				},{
					status: (check.status === 'open') ? 'in' : 'out',
				}).then(function (peoples) {
					var people = (peoples.length) ? peoples[0] : {status:'out'}
					return res.ok({
						status:people.status,
						total: check.total
					});
				}).catch(function (err) {
					return res.badRequest(err.message)
				});
			});
		}).catch(function (err) {
			return res.badRequest(err.message)
		});

	}

};
